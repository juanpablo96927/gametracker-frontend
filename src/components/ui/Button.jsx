import { Loader } from 'lucide-react';

export default function Button({ children, icon: Icon, loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`btn ${props.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'} ${props.className || ''}`}
    >
      {loading ? <Loader className="animate-spin" size={18} /> : Icon && <Icon size={18} className="mr-2" />}
      {children}
    </button>
  );
}