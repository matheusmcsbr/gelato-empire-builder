
/**
 * Utility functions for exporting data to various formats
 */

/**
 * Export data to Excel format
 * @param data Array of objects to export
 * @param filename Name for the download file (without extension)
 */
export const exportToExcel = (data: Array<Record<string, any>>, filename: string): void => {
  if (!data || !data.length) {
    console.error("No data to export");
    return;
  }

  try {
    // Get headers from the first data item
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    let csvContent = headers.join(",") + "\n";
    
    // Add data rows
    data.forEach(item => {
      const row = headers.map(header => {
        const cell = item[header] === null || item[header] === undefined ? "" : item[header];
        // Escape quotes and wrap in quotes if the cell contains commas or quotes
        const value = String(cell).replace(/"/g, '""');
        return `"${value}"`;
      });
      
      csvContent += row.join(",") + "\n";
    });
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a temporary link to download the file
    const link = document.createElement("a");
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Set link attributes
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = 'hidden';
    
    // Append to the document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
};
