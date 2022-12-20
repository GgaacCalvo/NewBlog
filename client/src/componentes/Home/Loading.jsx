import "./Loading.css";
export const Loading = () => {
  return (
    <div class="container">
      <div class="container__item landing-page-container">
        <div class="content__wrapper">
          <div class="ellipses-container">
            <h2 class="greeting">Hello</h2>

            <div class="ellipses ellipses__outer--thin">
              <div class="ellipses ellipses__orbit"></div>
            </div>

            <div class="ellipses ellipses__outer--thick"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
