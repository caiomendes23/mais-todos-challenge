import React, { useState } from 'react';

function ProductForm({ onSubmit, initialValues }) {
  const [name, setName] = useState(initialValues?.name || '');
  const [price, setPrice] = useState(initialValues?.price || '');

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      name,
      price: parseFloat(price),
    };

    onSubmit(product);
    setName('');
    setPrice('');
  };

  return (
    <div>
      <h2>{initialValues ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="price">Preço:</label>
        <input
          type="number"
          id="price"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">{initialValues ? 'Salvar' : 'Adicionar'}</button>
      </form>
    </div>
  );
}

export default ProductForm;
