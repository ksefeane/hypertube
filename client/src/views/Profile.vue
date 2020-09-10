<template>
    <div>
        <app-header></app-header>
        <div>
            <h1>profile {{ uid }}</h1>
            <!-- <canvas id="profile_pic"></canvas> -->
            
            <form>
                <input type="text" v-model="first_name"> <br>
            </form>
            <input type="submit" value="Update First Name" @click="update_first">
            <form>
                <input type="text" v-model="last_name"> <br>
            </form>
            <input type="submit" value="Update Last Name" @click="update_last">
            <form>
                <input type="text" v-model="username"> <br>
            </form>
            <input type="submit" value="Update Username" @click="update_username">
            <form>
                <input type="email" v-model="email"> <br>
            </form>
            <input type="submit" value="Update Email" @click="update_email">
            <br>
            <router-link to="/update_password">Update Password</router-link>
            <input type="file" name="" id="" @change="onFileSelected">
            <button @click="uploadImage">Upload</button>
            <br>
        </div>
        <h1>{{ message }}</h1>
        <app-footer></app-footer>
    </div>
</template>

<script>
// import axios from 'axios'
import Header from "../components/Header";
import Footer from "../components/Footer";

import axios from 'axios'
export default {
    components: {
        'app-header': Header,
        'app-footer': Footer
    },
    data() {
        return {
            id: this.$route.params.id,
            uid: localStorage.getItem('user'),
            username: '',
            first_name: 'Marcellus',
            email: 'marcel@wool.com',
            last_name: 'Wallace',
            message: 'this is the profile page',
            selectedFile: null
        }
    },
    // computed: {
    //     initialise: function() {
    //         this.uid = localStorage.getItem('user')
    //     }
    // },
    methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0]
            // console.log(event)
        },
        uploadImage() {
            console.log(this.selectedFile);
            console.log(this.id)
            let type = this.selectedFile.type
            // const url = ''
            // console.log('name: ' + this.selectedFile.name);
            // console.log('size: ' + this.selectedFile.size);
            // console.log('type: ' + this.selectedFile.type);
            // console.log(typeof type);
            const path = 'http://localhost:5000/api/users/upload/' + this.id
            let nn = type.split('/')
            if (nn[0] === 'image') {
                console.log("We've got an IMAGE!")
                axios.post(path, {
                    'image': this.selectedFile
                }).then((result) => {
                    console.log(result)
                }).catch((error) => {
                    console.log(error)
                })
            } else if (nn[0] === 'video') {
                console.log("We've got a VIDEO!");
            }
            // console.log(formData);
            // axios.post(url, {
            //     'image': this.selectedFile
            // })
        },
        update_details(field, value) {
            // const path = 'http://localhost:5000/api/users/signup/'
            // axios.post(path, {
            //     field: value
            // }).then((response) => {
            //     console.log(response)
            // }).catch((err) => {
            //     console.log(err)
            // })
            alert(field + ' : ' + value)
        },
        update_username() {
            this.update_details('username', this.username)
            localStorage.setItem('user', this.username)
        },
        update_first() {
            this.update_details('first_name', this.first_name)
        },
        update_last() {
            this.update_details('last_name', this.last_name)
        },
        update_email() {
            this.update_details('email', this.email)
        },
    }
}
</script>