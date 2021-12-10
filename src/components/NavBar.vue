<template>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
    />
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-white navbar">
      <div class="container-fluid">
        <h2>
          <img
            src="@/assets/esunLogo.jpeg"
            class="rounded float-start"
            style="
              height: 70px;
              margin-left: 5px;
              margin-right: 5px;
              margin-bottom: 5px;
            "
          />私人銀行管理平台
        </h2>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">股權架構圖</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/info" class="nav-link">本行顧客</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/potential" class="nav-link">關係戶</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </body>
</template>
<style scoped>
.bg-white {
  background-color: #fff;
}
.navbar {
  width: 100%;
}
</style>
