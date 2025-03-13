import { Button } from "../../components/ui/button";
import { Printer } from "lucide-react";

export default function PrintResults() {
  const handlePrint = () => {
    // Create a print-optimized version with only the key information
    const printContent = document.getElementById('mortgage-calculator-results');
    
    if (printContent) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Mortgage Calculator Results</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  padding: 20px;
                  color: #333;
                }
                h1 {
                  color: #2563eb;
                  border-bottom: 1px solid #e5e7eb;
                  padding-bottom: 10px;
                }
                .result-section {
                  margin-bottom: 20px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                th, td {
                  border: 1px solid #e5e7eb;
                  padding: 10px;
                  text-align: left;
                }
                th {
                  background-color: #f3f4f6;
                }
                .summary-box {
                  background-color: #f3f4f6;
                  padding: 15px;
                  border-radius: 5px;
                  margin-bottom: 20px;
                }
                .total {
                  font-weight: bold;
                }
                .footer {
                  margin-top: 40px;
                  font-size: 0.8rem;
                  color: #6b7280;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <h1>Mortgage Calculator Results</h1>
              ${printContent.innerHTML}
              <div class="footer">
                <p>Generated on ${new Date().toLocaleDateString()}</p>
                <p>This is for informational purposes only and not a loan offer.</p>
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Print after a slight delay to ensure content is loaded
        setTimeout(() => {
          printWindow.print();
          // Close window after print dialog closes (optional)
          printWindow.addEventListener('afterprint', () => printWindow.close());
        }, 300);
      }
    }
  };

  return (
    <Button 
      variant="outline" 
      className="text-primary text-sm flex items-center" 
      onClick={handlePrint}
    >
      <Printer className="h-4 w-4 mr-1" /> Print Results
    </Button>
  );
}