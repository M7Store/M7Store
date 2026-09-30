const SUPABASE_URL =
    "https://kmxpwdgenkhqyhnjjfzf.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_UpAW1S3BKBNGGrlUCB_EvA_BwwDhBbF";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.style.color = "#aaa";
    message.textContent = "Entrando...";

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {

        console.error(error);

        message.style.color = "#ff5555";
        message.textContent = "E-mail ou senha incorretos.";

        return;
    }

    message.style.color = "#55ff88";
    message.textContent = "Login realizado!";

    // Por enquanto, só vamos confirmar que o login funcionou.
    console.log("Administrador conectado:", data.user);

});
