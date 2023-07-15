import Header from '@/components/header';
import FormInfo from '@/components/form-info';
import FormContent from '@/components/form-content';
import '@styles/form.scss';

export default function Home() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <FormInfo />
        <FormContent />
      </div>
    </>
  );
}
