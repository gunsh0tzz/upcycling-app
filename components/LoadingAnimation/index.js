import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: transparent;
  align-self: center;
  width: 100%;

  .fullscreen {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @-webkit-keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .corners {
    width: 60px;
    height: 60px;
    position: relative;
    transform-origin: center;
    -webkit-animation: spin 3s infinite linear;
    animation: spin 3s infinite linear;
  }
  .corner {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .corner::before {
    display: block;
    width: 48%;
    height: 48%;
    border-radius: 0 40% 0 40%;
    content: "";
  }
  @-webkit-keyframes spin1 {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(0deg);
    }
    70% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes spin1 {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(0deg);
    }
    70% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin2 {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(270deg);
    }
    70% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes spin2 {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(270deg);
    }
    70% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin3 {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(180deg);
    }
    70% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes spin3 {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(180deg);
    }
    70% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin4 {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(90deg);
    }
    70% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes spin4 {
    0% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(90deg);
    }
    70% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .corner--1 {
    -webkit-animation: spin1 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    animation: spin1 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  .corner--1::before {
    background-color: #ca92de;
  }
  .corner--2 {
    -webkit-animation: spin2 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    animation: spin2 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  .corner--2::before {
    background-color: #ca92de;
  }
  .corner--3 {
    -webkit-animation: spin3 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    animation: spin3 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  .corner--3::before {
    background-color: #ca92de;
  }
  .corner--4 {
    -webkit-animation: spin4 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    animation: spin4 3s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  .corner--4::before {
    background-color: #44c67f;
  }

  svg {
    margin-bottom: 1rem;
    padding-left: 3rem;
  }
`;

const LoadingAnimation = ({ fullScreen, showLogo }) => {
  const [loading, setLoading] = useState(true);

  return (
    <StyledLoader>
      <div className={[fullScreen ? "fullscreen" : ""].join(" ").trim()}>
        <div
          style={{ display: showLogo ? "block" : "none", marginLeft: "3rem" }}
          dangerouslySetInnerHTML={{
            __html: `
            <svg width="240" height="94" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.53 46V22.727h8.727c1.788 0 3.288.31 4.5.932 1.22.621 2.14 1.492 2.762 2.614.628 1.113.943 2.413.943 3.898 0 1.492-.319 2.787-.955 3.886-.629 1.09-1.557 1.935-2.784 2.534-1.227.59-2.735.886-4.523.886h-6.216v-3.5h5.648c1.046 0 1.902-.144 2.568-.431.667-.296 1.16-.724 1.478-1.285.325-.568.488-1.265.488-2.09 0-.826-.163-1.53-.488-2.114-.326-.591-.822-1.038-1.49-1.341-.666-.31-1.526-.466-2.579-.466h-3.863V46H19.53Zm12.023-10.545L37.313 46H32.61L26.95 35.455h4.603ZM47.638 46.34c-1.75 0-3.262-.364-4.534-1.091-1.265-.735-2.239-1.773-2.92-3.114-.683-1.348-1.023-2.935-1.023-4.761 0-1.795.34-3.371 1.022-4.727.69-1.364 1.652-2.425 2.887-3.182 1.234-.765 2.685-1.148 4.352-1.148a8.81 8.81 0 0 1 3.045.523c.962.34 1.81.871 2.546 1.59.742.72 1.326 1.637 1.75 2.75.424 1.107.636 2.425.636 3.955v1.262H41.092v-2.773h10.364c-.008-.788-.178-1.489-.511-2.102a3.718 3.718 0 0 0-1.398-1.466c-.591-.356-1.28-.534-2.068-.534-.841 0-1.58.204-2.216.613a4.228 4.228 0 0 0-1.489 1.591 4.578 4.578 0 0 0-.534 2.148v2.42c0 1.016.186 1.887.557 2.614.371.72.89 1.273 1.557 1.66.666.378 1.447.567 2.34.567.6 0 1.14-.083 1.626-.25a3.607 3.607 0 0 0 1.261-.761c.356-.333.625-.746.807-1.239l3.84.432a5.988 5.988 0 0 1-1.386 2.66c-.674.75-1.538 1.333-2.59 1.75-1.054.408-2.258.613-3.614.613Zm22.366-7.682V28.546h4.114V46h-3.989v-3.102h-.182c-.394.977-1.041 1.776-1.943 2.397-.894.622-1.996.932-3.307.932-1.144 0-2.155-.253-3.034-.761-.87-.515-1.553-1.261-2.045-2.239-.492-.985-.739-2.174-.739-3.568V28.546h4.114v10.477c0 1.106.303 1.985.909 2.636.606.652 1.401.977 2.386.977.606 0 1.194-.147 1.762-.443a3.582 3.582 0 0 0 1.397-1.318c.372-.59.557-1.33.557-2.216Zm22.14-5.5-3.75.41a3.013 3.013 0 0 0-.557-1.069 2.764 2.764 0 0 0-1.046-.807c-.44-.204-.977-.307-1.613-.307-.856 0-1.576.186-2.16.557-.575.371-.86.852-.852 1.443-.007.508.178.92.557 1.239.386.318 1.023.58 1.91.784l2.976.636c1.652.356 2.88.92 3.682 1.694.81.772 1.22 1.784 1.228 3.034-.008 1.098-.33 2.068-.966 2.909-.63.833-1.504 1.485-2.625 1.954-1.122.47-2.41.705-3.864.705-2.136 0-3.856-.447-5.16-1.341-1.302-.901-2.079-2.155-2.329-3.761l4.012-.387c.181.788.568 1.383 1.159 1.784.59.402 1.36.603 2.307.603.977 0 1.76-.201 2.352-.603.598-.401.898-.897.898-1.488 0-.5-.194-.913-.58-1.239-.379-.326-.97-.576-1.773-.75l-2.977-.625c-1.674-.348-2.913-.935-3.716-1.761-.803-.834-1.2-1.887-1.193-3.16-.008-1.075.284-2.007.875-2.795.598-.795 1.428-1.409 2.489-1.84 1.068-.44 2.299-.66 3.693-.66 2.045 0 3.655.436 4.83 1.307 1.181.871 1.912 2.05 2.193 3.534Zm11.494 13.182c-1.75 0-3.262-.364-4.534-1.091-1.266-.735-2.239-1.773-2.92-3.114-.683-1.348-1.023-2.935-1.023-4.761 0-1.795.34-3.371 1.022-4.727.69-1.364 1.652-2.425 2.887-3.182 1.234-.765 2.685-1.148 4.352-1.148 1.076 0 2.091.174 3.045.523.962.34 1.811.871 2.546 1.59.742.72 1.326 1.637 1.75 2.75.424 1.107.636 2.425.636 3.955v1.262H97.092v-2.773h10.364c-.008-.788-.178-1.489-.511-2.102a3.727 3.727 0 0 0-1.398-1.466c-.591-.356-1.28-.534-2.068-.534-.841 0-1.58.204-2.216.613a4.222 4.222 0 0 0-1.489 1.591 4.578 4.578 0 0 0-.534 2.148v2.42c0 1.016.186 1.887.557 2.614a3.97 3.97 0 0 0 1.557 1.66c.666.378 1.447.567 2.341.567.598 0 1.14-.083 1.625-.25a3.613 3.613 0 0 0 1.261-.761c.356-.333.625-.746.807-1.239l3.841.432a5.993 5.993 0 0 1-1.387 2.66c-.674.75-1.538 1.333-2.591 1.75-1.053.408-2.257.613-3.613.613Z" fill="#1A1A19"/><mask id="a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="57" y="4" width="31" height="33"><path fill="#D9D9D9" d="M57 4h31v33H57z"/></mask><g mask="url(#a)"><path d="M71.208 32.875V21.909a9.722 9.722 0 0 1-3.971-.842 10.26 10.26 0 0 1-3.359-2.389 10.793 10.793 0 0 1-2.228-3.575 11.744 11.744 0 0 1-.775-4.228v-2.75h2.583c1.357 0 2.67.28 3.94.842 1.27.562 2.39 1.358 3.358 2.39a10.44 10.44 0 0 1 1.663 2.337c.442.848.78 1.753 1.017 2.715.108-.16.226-.315.356-.464.129-.149.269-.303.42-.464a10.26 10.26 0 0 1 3.358-2.389 9.72 9.72 0 0 1 3.972-.842h2.583V15c0 1.467-.264 2.876-.791 4.228a11.013 11.013 0 0 1-2.244 3.575 10.09 10.09 0 0 1-3.343 2.372 9.78 9.78 0 0 1-3.955.825v6.875h-2.584Zm0-13.75c0-1.1-.199-2.148-.597-3.145a8.416 8.416 0 0 0-1.695-2.664 7.86 7.86 0 0 0-2.503-1.805 7.084 7.084 0 0 0-2.955-.636c0 1.1.194 2.154.582 3.162a8.145 8.145 0 0 0 1.679 2.682 7.586 7.586 0 0 0 2.519 1.787 7.365 7.365 0 0 0 2.97.619Zm2.584 4.125a7.252 7.252 0 0 0 2.954-.619 7.636 7.636 0 0 0 2.503-1.787A8.533 8.533 0 0 0 81.542 15a7.195 7.195 0 0 0-2.971.636 7.806 7.806 0 0 0-2.519 1.805 8.188 8.188 0 0 0-1.68 2.664 8.605 8.605 0 0 0-.58 3.145Z" fill="#1C1B1F"/></g></svg>
        `,
          }}
        ></div>
        <div class="corners">
          <div class="corner corner--1"></div>
          <div class="corner corner--2"></div>
          <div class="corner corner--3"></div>
          <div class="corner corner--4"></div>
        </div>
      </div>
    </StyledLoader>
  );
};

LoadingAnimation.defaultProps = {
  fullScreen: false,
  showLogo: false,
};

export default LoadingAnimation;
