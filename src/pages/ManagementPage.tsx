import TodoControl from '../components/body/TodoControl';
import Header from '../components/header/Header';
import { Container } from 'react-bootstrap';

const ManagementPage = () => {
  return (
    <>
      <Header />
      <Container className="mt-4">
        <TodoControl />
      </Container>
    </>
  );
};

export default ManagementPage;
