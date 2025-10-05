import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieForm({ onAdd, editingMovie, onCancelEdit }) {
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (editingMovie) {
      setValue("name", editingMovie.name);
      setValue("theater", editingMovie.hall);
      setValue("price", editingMovie.price);
      setValue("img", editingMovie.poster);
    } else {
      reset();
    }
  }, [editingMovie, setValue, reset]);

  const onSubmit = (data) => {
    if (!data.img) {
      data.img = "https://i.pinimg.com/736x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg";
    }
    onAdd(data);
    reset();
    navigate("/movies");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "5px" }}> Naziv filma:</label>
          <input 
            type="text" 
            {...register('name', { required: 'Naslov filma je obavezan' })} 
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
              width: "250px"
            }}/>
        {formState.errors.name && <p style={{ color: 'red' }}>{formState.errors.name.message}</p>}
        <br />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "5px" }}>Sala:</label>
          <input 
            type="number" 
            {...register('theater', { required: 'Sala je obavezna' })} 
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
              width: "250px"
            }}/>
        {formState.errors.theater && <p style={{ color: 'red' }}>{formState.errors.theater.message}</p>}
        <br />
      </div>
      
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "5px" }}>Cena:</label>
          <input 
            type="number" 
            {...register('price', { required: 'Cena je obavezna' })} 
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
              width: "250px"
            }}/>
        {formState.errors.price && <p style={{ color: 'red' }}>{formState.errors.price.message}</p>}
        <br />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "5px" }}>URL slike:</label>
          <input 
            type="text" 
            {...register('img')} 
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
              width: "250px"
            }}/>
        <br />
      </div>

      <div>
        <button type="submit">{editingMovie ? "Edit" : "Add"}</button>
        <button
          type="button"
          onClick={() => {
            reset();
            if (onCancelEdit) onCancelEdit();
            navigate("/movies");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MovieForm;
