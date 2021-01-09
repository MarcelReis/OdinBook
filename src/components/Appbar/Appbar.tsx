import useAuth from "../../hooks/useAuth";

const Appbar = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Appbar;
