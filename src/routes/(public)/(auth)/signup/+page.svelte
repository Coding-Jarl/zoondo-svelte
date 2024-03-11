<script lang="ts">
  import { enhance } from '$app/forms';
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
  <label for="username">Username</label>
  <input name="username" class="text-slate-950" id="username" /><br />
  <label for="username">Email</label>
  <input name="email" class="text-slate-950" id="email" /><br />
  <label for="password">Password</label>
  <input type="password" class="text-slate-950" name="password" id="password" /><br />
  <input type="submit" />
</form>
<a href="/signin">Sign in</a>
