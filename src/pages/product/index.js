import React, { useState } from 'react';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useStore from '../../store/store';
import { formatCurrency } from '../../utils/format';
import './styles.css'

function Product() {
  const { productId } = useParams();
  const { editProduct, deleteProduct } = useStore();
  const product = useStore((state) => state.products.find((item) => item.id === Number(productId)));
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('O título é obrigatório'),
    price: Yup.number().required('O preço é obrigatório'),
    description: Yup.string().required('A descrição é obrigatória'),
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (values) => {
    editProduct(productId, values);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteProduct(productId);
    navigate('/');
  };

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      {!editing ? (
        <div>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">Price: {formatCurrency(product.price)}</p>
          <p>Description: {product.description}</p>
          <div className="product-actions">
            <button className="edit-button" onClick={handleEdit}>
              Editar
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Excluir
            </button>
            <button className="back-button" onClick={() => navigate("/")}>
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            title: product.title,
            price: product.price,
            description: product.description,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          <Form className="product-form">
            <div className="form-control">
              <label className="field-label" htmlFor="title">Título</label>
              <Field className="field-input" type="text" name="title" id="title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="form-control">
              <label className="field-label" htmlFor="price">Preço</label>
              <Field className="field-input" style={{ width: '50%' }} type="text" name="price" id="price" validate={(value) => {
                if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                  return 'Formato de preço inválido';
                }
              }} />
              <ErrorMessage name="price" component="div" className="error" />
            </div>
            <div className="form-control">
              <label className="field-label" htmlFor="description">Descrição</label>
              <Field className="field-input" as="textarea" name="description" id="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>
            <button type="submit">Salvar</button>
          </Form>
        </Formik>
      )}
    </div>
  );
}

export default Product;
