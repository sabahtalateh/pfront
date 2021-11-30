<header class="header">
  <div class="elem logo">
    <!--		<img src='/logo.svg' alt=''>-->
  </div>
  <nav class="elem nav">
    <a class="nav-item" href="#">Создать&nbsp;объявление</a>
    <a class="nav-item" href="#">Картотека</a>
    <a class="nav-item" href="#">О&nbsp;Нас</a>
  </nav>
  <div class="elem auth">
    <a class="login" href="#">
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"
        />
      </svg>
    </a>
  </div>
</header>

<style lang="scss">
  @import '../utils';

  .header {
    @include outer-wrap;

    font-family: 'Prata', 'Times New Roman', serif;
    padding: 4px;
    display: flex;
    border-bottom: 4px double black;

    .elem {
      margin: 4px;
    }

    .logo {
      width: 40px;
      height: 40px;
      min-width: 40px;
      align-self: center;
      position: relative;
    }

    .nav {
      flex-grow: 1;
      align-self: center;
      padding: 5px;
      text-align: center;
      border-left: 3px double gray;
      border-right: 3px double gray;
    }

    .auth {
      width: 32px;
      height: 32px;
      min-width: 32px;
      align-self: center;
      color: black;

      .login {
        color: black;
      }
    }

    .nav .nav-item {
      padding: 7px;
      color: black;
      text-decoration: none;
      font-size: 20px;
      border-radius: 7px;
      transition: background 0.6s ease;

      :hover {
        background: #f7f7f7;
      }
    }
  }
</style>
