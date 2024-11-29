import { utils, writeFile } from 'xlsx';

export const exportToExcel = (data, filename, sheetName = 'Sheet1') => {
  try {
    const ws = utils.json_to_sheet(data);
    
    // Auto-size columns
    const colWidths = data.reduce((widths, row) => {
      Object.keys(row).forEach(key => {
        const value = String(row[key] || '');
        widths[key] = Math.max(widths[key] || 10, value.length);
      });
      return widths;
    }, {});

    ws['!cols'] = Object.values(colWidths).map(width => ({ width }));

    // Style headers
    const range = utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = utils.encode_cell({ r: 0, c: C });
      if (!ws[address]) continue;
      ws[address].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "EFEFEF" } }
      };
    }

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, sheetName);
    writeFile(wb, `${filename}.xlsx`);
    return true;
  } catch (error) {
    console.error('Export error:', error);
    return false;
  }
};