<template>
  <div class="search-bar">
    <div class="ui search">
      <div class="ui icon input">
        <button id="filter-button" class="ui button icon white">
          <i class="filter icon"></i>
        </button>
        <input id="search" class="prompt" type="text" placeholder="Look for events..." />
        <i class="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
  </div>
</template>

<style scoped>
  #search {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;  
  }

  #filter-button {
    border-radius: 500rem;
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
    margin-right: 0%;
  }
  
  .ui.search {
    padding: 5px 0% 0%;
  }
</style>