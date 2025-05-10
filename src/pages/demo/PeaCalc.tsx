import MainLayout from '@/layouts/MainLayout';
import React, { useState } from 'react';

const PeaCalc = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [pricePerKg, setPricePerKg] = useState(0);

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value);
    // Generate daily input fields based on the selected month
    // This will be implemented later
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Implement OCR analysis here
    }
  };

  return (
    <MainLayout>
      <div className="pea-calc">
        <h1 className="text-3xl font-bold mb-6">Pea Calculate</h1>
        <div className="mb-4">
          <label htmlFor="month">Select Month:</label>
          <input type="month" id="month" value={selectedMonth} onChange={handleMonthChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="price">Price per Kg:</label>
          <input
            type="number"
            id="price"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageUpload} />
        </div>
        {/* Render daily input fields and calculated costs here */}
      </div>
    </MainLayout>
  );
};

export default PeaCalc;
