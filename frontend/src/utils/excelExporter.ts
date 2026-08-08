import * as XLSX from 'xlsx';

export const exportToExcel = (
  calculatorTitle: string,
  inputs: Record<string, any>,
  results: Record<string, any>
) => {
  const data = [
    { Section: 'Metadata', Key: 'Calculator', Value: calculatorTitle },
    { Section: 'Metadata', Key: 'Timestamp', Value: new Date().toLocaleString() },
    ...Object.entries(inputs).map(([k, v]) => ({
      Section: 'Inputs',
      Key: k,
      Value: String(v),
    })),
    ...Object.entries(results).map(([k, v]) => ({
      Section: 'Results',
      Key: k,
      Value: String(v),
    })),
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Calculation');

  XLSX.writeFile(
    workbook,
    `${calculatorTitle.toLowerCase().replace(/\s+/g, '_')}_result.xlsx`
  );
};
