import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkHistory } from '../../context/WorkHistoryContext';
import ImageGrid from '../../components/gallery/ImageGrid';
import FullScreenGallery from '../../components/gallery/FullScreenGallery';
import DataTable from '../../components/common/DataTable';
import { exportToExcel } from '../../utils/excelExport';
import { FaFileExcel } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

function WorkHistoryPage() {
  const { id } = useParams();
  const { getProviderWorkHistory } = useWorkHistory();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState(null);
  
  const workHistory = getProviderWorkHistory(id);

  const handleExport = () => {
    const exportData = workHistory.map(({
      customerName,
      serviceName,
      workAddress,
      serviceCharge,
      timeRequired,
      description,
      date
    }) => ({
      'Customer Name': customerName,
      'Service': serviceName,
      'Work Address': workAddress,
      'Service Charge': serviceCharge,
      'Time Required': timeRequired,
      'Description': description,
      'Date': date
    }));

    if (exportToExcel(exportData, 'work-history')) {
      toast.success('Work history exported successfully');
    } else {
      toast.error('Failed to export work history');
    }
  };

  const columns = [
    {
      header: 'Customer Name',
      accessorKey: 'customerName',
    },
    {
      header: 'Service',
      accessorKey: 'serviceName',
    },
    {
      header: 'Work Address',
      accessorKey: 'workAddress',
    },
    {
      header: 'Service Charge',
      accessorKey: 'serviceCharge',
      cell: ({ getValue }) => `₹${getValue()}`,
    },
    {
      header: 'Time Required',
      accessorKey: 'timeRequired',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Work Images',
      accessorKey: 'images',
      cell: ({ getValue, row }) => {
        const images = getValue();
        if (images.length === 0) return <span className="text-gray-500">No images</span>;
        
        return (
          <ImageGrid
            images={images}
            onImageClick={(index) => {
              setSelectedImageIndex(index);
              setSelectedImages(images);
            }}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Work History</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View detailed work history and completed services
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <FaFileExcel className="mr-2" />
          Export to Excel
        </button>
      </div>

      <DataTable
        data={workHistory}
        columns={columns}
        pageSize={10}
      />

      {selectedImages && (
        <FullScreenGallery
          images={selectedImages}
          initialIndex={selectedImageIndex}
          onClose={() => {
            setSelectedImages(null);
            setSelectedImageIndex(null);
          }}
        />
      )}
    </div>
  );
}

export default WorkHistoryPage;