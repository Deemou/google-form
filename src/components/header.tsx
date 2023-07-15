import PreviewButton from './preview-button';
import '@styles/header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="button-list">
        <PreviewButton />
      </div>
    </header>
  );
}