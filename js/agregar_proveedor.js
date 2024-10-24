var url = "bd/crud_addProveedor.php";

const appRequesition = new Vue({
    el: "#AppNewProv",
    data: {
        users: [],
        bancos:[],
        obras: [],
        NameUser: "",
        selected_Banco: "",
        nombre_prov: "",
        direccion_prov: "",
        rfc_prov: "",
        clabe_prov: "",
        cuenta_prov: "",
        tarjeta_prov: "",
        referencia_prov: "",
        tipo_prov: "",
        suc_prov: "",
        tel_prov: "",
        email_prov: ""
    },
    methods: {
        consultarUsuario: function(user_id){
            axios.post(url, { accion: 2, id_user: user_id}).then(response => {
                this.users = response.data;
                this.NameUser = this.users[0].user_name;
                console.log(this.users);
            });
        },
        irPresion(idPresion)
        {
            localStorage.setItem("obraActiva", idPresion);
            window.location.href = "http://localhost/FuentesCorp/FuentesCorp-Platform/presiones.php";
        },
        listarObras: function(){
            axios.post(url, {accion: 3}).then(response => {
                this.obras = response.data;
                console.log(this.obras);
            });
        },
        listarBancos: function(){
            axios.post(url, { accion: 1 }).then(response => {
                this.bancos = response.data;
                console.log(this.bancos);
            });
        },
        agregarProveedor: async function(){
            const { value: formValues } = await Swal.fire({
                title: "¿Quieres guardar el proveedor?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                denyButtonText: `No Guardar`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.post(url, { accion: 4, nombre: this.nombre_prov, direccion: this.direccion_prov, rfc: this.rfc_prov, clabe: this.clabe_prov, cuenta: this.cuenta_prov, tarjeta: this.tarjeta_prov, referencia: this.referencia_prov, banco: this.selected_Banco, tipoProv: this.tipo_prov, sucursal: this.suc_prov, telefono: this.tel_prov, correo: this.email_prov}).then(response => {
                        console.log(response.data);
                    });
                    Swal.fire("El proveedor fue guardada con Exito", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("No se guardo el proveedor", "", "info");
                }
            });
        }
    },
    created: function () {
        this.listarObras();
        this.consultarUsuario(localStorage.getItem("NameUser"));
        this.listarBancos();
    },
    computed: {

    }
});