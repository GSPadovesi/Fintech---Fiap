const Login = () => {

    const form = document.querySelector('form');
    const button = form.querySelector('button');
    // debugger;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('evento', event);
        
        const form = event.target;
        const data = new FormData(form);
        // console.log(form.elements);

        // for(let key in form.elements){
        //     console.log(form.elements[key]);
        // }

        // const inputs = form.querySelectorAll('input');

        // inputs.forEach((item) => {
        //     data.append(item.name, item.value);
        //     // console.log(item.value)
        // })

        for(const pair of data.entries()){
            console.log(pair)
        }

        const fetchConfig = {
            method: 'POST',
            body: data
        }

        fetch('login.json' /*, fetchConfig */)
        .then((result) => {
            console.log(result)
            if(result.status == 200){
                result.json()
                    .then((content) => {
                        console.log(content)

                        const email = data.get('email');
                        const found = content.filter(item => item.email === email).map(item => { return item.nome });
                        const alert = document.querySelector('.alert');
                        console.log(found)

                        alert.classList.remove('alert-success');
                        alert.classList.remove('alert-danger');

                        if(found.length > 0){
                            const userName = found[0];
                            const a = document.querySelector('.logado');
                            alert.innerHTML = `Bem vindo ${userName}`;
                            alert.classList.add('alert-success');
                            a.href = 'telaInicial.html';
                            console.log(a)
                        } else {
                            alert.innerHTML = 'Não foi possivel encontrar o usuário';
                            alert.classList.add('alert-danger');
                        }
                        alert.style.display = 'block';
                    })
            }
        })
    });
}
export default Login;