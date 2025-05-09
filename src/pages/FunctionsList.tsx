import MainLayout from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';

function FunctionsList() {
  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Functions List</h1>
        <div className="space-y-4">
          <Link
            to={ROUTES.DEMO_TEMPLATE_TABLE}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Template Table</h2>
            <p className="text-gray-600">
              A reusable table component with sorting and filtering capabilities
            </p>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default FunctionsList;
