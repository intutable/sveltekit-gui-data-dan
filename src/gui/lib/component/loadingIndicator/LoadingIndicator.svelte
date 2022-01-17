<script lang="ts">
</script>

<div class="container">
    <div class="indicator"></div>
    <div class="title">Executing Code</div>
</div>

<style lang="sass">
  .container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    height: 100%
    padding: 1rem

  .indicator
    height: 50px
    width: 50px
    border:
      color: #FF3E00 #FF3E00 #FF3E00 transparent
      width: 3px
      style: solid
      radius: 50%
    animation: 0.75s linear 0s infinite normal none running rotate

  .title
    font-weight: bold
    padding-top: 1rem

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
