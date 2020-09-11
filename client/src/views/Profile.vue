<template>
    <div>
        <app-header></app-header>
        <div>
            <h1>Hello {{ uid }}</h1>
            <div v-for="update in updates" :key="update">
                <small>{{ update }}</small>
            </div>
            <!-- <canvas id="profile_pic"></canvas> -->
            <input type="file" name="" id="" @change="onFileSelected"> <br>
            <button @click="uploadImage">Upload</button>
            <form>
                <input type="text" v-model="username"> <br>
            </form>
            <input type="submit" value="Update Username" @click="update_username">
            <br>
            <form>
                <input type="text" v-model="first_name"> <br>
            </form>
            <input type="submit" value="Update First Name" @click="update_first">
            <form>
                <input type="text" v-model="last_name"> <br>
            </form>
            <input type="submit" value="Update Last Name" @click="update_last">
            <form>
                <input type="email" v-model="email"> <br>
            </form>
            <input type="submit" value="Update Email" @click="update_email">
            <br>
            <router-link to="/update_password">Update Password</router-link>
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
            first_name: '',
            email: '',
            last_name: '',
            message: 'this is the profile page',
            selectedFile: null,
            updates: []
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
            // console.log(this.id)
            let type = this.selectedFile.type
            // const url = ''
            // console.log('name: ' + this.selectedFile.name);
            // console.log('size: ' + this.selectedFile.size);
            // console.log('type: ' + this.selectedFile.type);
            // console.log(typeof type);
            const path = 'http://localhost:5000/api/users/upload/' + this.id
            let nn = type.split('/')
            if (nn[0] === 'image') {
                axios.post(path, {
                    'image': this.selectedFile
                }).then((result) => {
                    console.log(result)
                }).catch((error) => {
                    console.log("yohohoho", error)
                })
            } else if (nn[0] === 'video') {
                console.log("We've got a VIDEO!");
            }
            // console.log(formData);
            // axios.post(url, {
            //     'image': this.selectedFile
            // })
        },
        update_details(data, url) {
            const path = 'http://localhost:5000/api/users/update-' + url
            axios.post(path, data).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })
        },
        update_username() {
            this.updates = []
            let data = {
                'email': this.email, 
                'username': this.username
            }
            this.update_details(data, 'username/')
            this.updates.push("Username updated")
            localStorage.setItem('user', this.username)
        },
        update_first() {
            this.updates = []
            let data = {
                'email': this.email, 
                'first_name': this.first_name
            }
            this.update_details(data, 'first/')
            this.updates.push("First name updated")
        },
        update_last() {
            this.updates = []
            let data = {
                'email': this.email, 
                'last_name': this.last_name
            }
            this.update_details(data, 'last/')
            this.updates.push("Last name updated")
        },
        update_email() {
            this.updates = []
            let data = {
                'email': this.email, 
                'username': this.username
            }
            this.update_details(data, 'email/')
            this.updates.push("Email updated")
        },
        fetch_user_data() {
            // fetch user info and paste it on the form for editing
            const path = 'http://localhost:5000/api/users/update/'
            axios.post(path, {
                'username': this.id
            }).then((result) => {
                console.log('It worked')
                console.log(result.data[0])
                if (result.data[0]) {
                    this.email = result.data[0].email
                    this.last_name = result.data[0].last_name
                    this.first_name = result.data[0].first_name
                    this.username = result.data[0].username
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.fetch_user_data()
    }
}
</script>