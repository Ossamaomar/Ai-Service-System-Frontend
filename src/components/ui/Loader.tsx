import styled from "styled-components";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <StyledWrapper>
        <div className="loader"></div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .loader {
    position: relative;
    width: 50px;
    height: 50px;
  }

  .loader::before,
  .loader::after {
    content: "";
    border-radius: 50%;
    position: absolute;
    inset: 0;
    box-shadow: 0 0  2px rgba(0, 0, 0, 0.3) inset;
  }
  .loader:after {
    box-shadow: 0 3px 0 #057f77 inset;
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
