import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ModalParking } from './Components/Layouts/ModalParking/ModalParking';
import { MainLogIn } from './Components/Layouts/MainLogIn/MainLogIn';



// PRUEBA UNITARIA DE RENDERIZACION DE LA MODAL
      test('should render modal', () => {
        render(<ModalParking isOpen={true} onRequestClose={() => {}} />);
        const modalElement = screen.getByRole('dialog');
        expect(modalElement).toBeInTheDocument();
        });

// PRUEBA UNITARIA DE QUE LA MODAL TENGA LA ACERCION EN EL BACKGROUND
        test('should style modal', () => {
          render(<ModalParking isOpen={true} onRequestClose={() => {}} />);
          const modalElement = screen.getByRole('dialog');
          expect(modalElement).toHaveStyle({
            background: 'linear-gradient(to bottom, #a1baca, rgb(243, 243, 243))'
          });
        });


// PRUEBA UNITARIA AL ABRIR LA MODAL DANDO CLICK A LA IMAGEN
        test('should open modal on image click', () => {
          render(
            // utilizamos el browserRouter para el manejo de links y rutas y la lectura del componente
            <BrowserRouter>
            <MainLogIn />
          </BrowserRouter>
          );
        
          const imageElement = screen.getByAltText('Image'); 
          fireEvent.click(imageElement);
        
          const modalElement = screen.queryByRole('dialog');
          expect(modalElement).toBeInTheDocument();
        });
