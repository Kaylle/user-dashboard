<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a
        href="#"
        class="flex items-center gap-2 self-center font-medium"
      >
        <div class="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <PhImage :size="24" />
        </div>
        User Dashboard Inc.
      </a>
      <div class="flex flex-col gap-6">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-xl">
              Welcome back
            </CardTitle>
            <CardDescription>
              Login with your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div class="grid gap-6">
                <div class="grid gap-6">
                  <div class="grid gap-2">
                    <Label html-for="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      v-model="authForm.email"
                    />
                  </div>
                  <div class="grid gap-2">
                    <div class="flex items-center">
                      <Label html-for="password">
                        Password
                      </Label>
                      <a
                        href="#"
                        class="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      v-model="authForm.password"
                    />
                  </div>
                  <Button
                    type="submit"
                    class="w-full"
                    @click.prevent="login"
                  >
                    Login
                  </Button>
                </div>
                <div class="text-center text-sm">
                  Don't have an account?
                  <a
                    href="#"
                    class="underline underline-offset-4"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhImage } from "@phosphor-icons/vue";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { toast } from "vue-sonner";

const router = useRouter();

const authForm = ref({
  email: "",
  password: ""
})

const login = () => {
  if (authForm.value.email !== 'kurkina.ee@gmail.com' || authForm.value.password !=='0000')
    return toast.error('Error!', {
      description: 'Wrong email or password!'
    });
  //pinia
  toast.success('Success!', {
    description: 'You have successfully logged in!'
  });
  router.push('/');
};
</script>