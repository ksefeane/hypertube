<template>
    <div>
        <app-header></app-header>
        <div>
            <h1>profile {{ username }}</h1>
            <!-- <canvas id="profile_pic"></canvas> -->
            <div v-for="update in updates" :key="update">
                <small>{{ update }}</small>
            </div>
            <form>
                <input type="text" v-model="first_name"> <br>
            </form>
            <input type="submit" value="Update First Name" @click="update_first"><br><br>
            <form>
                <input type="text" v-model="last_name"> <br>
            </form>
            <input type="submit" value="Update Last Name" @click="update_last"><br><br>
            <form>
                <input type="text" v-model="username"> <br>
            </form>
            <input type="submit" value="Update Username" @click="update_username"><br><br>
            <form>
                <input type="email" v-model="email"> <br>
            </form>
            <input type="submit" value="Update Email" @click="update_email"><br>
            <br>
            <router-link to="/update_password">Update Password</router-link><br>
            <input type="file" name="" id="" @change="onFileSelected">
            <button @click="uploadImage">Upload</button>
            <br><br>
            <form>
                <input type="password" v-model="current_pass" placeholder="Enter current password"> <br>
                <input type="password" v-model="new_pass" placeholder="Enter new password"> <br>
                <input type="password" v-model="confirm_pass" placeholder="Confirm new password"> <br>
            </form>
            <input type="submit" value="Update Password" @click="update_password"><br>
        </div>
        
        <app-footer></app-footer>
    </div>
</template>

<script>
// import axios from 'axios'
import Header from "../components/Header";
import Footer from "../components/Footer";

import axios from 'axios'
import jwt from 'njwt'
export default {
    components: {
        'app-header': Header,
        'app-footer': Footer
    },
    data() {
        return {
            id: this.$route.params.id,
            uid: '',
            username: '',
            first_name: '',
            email: '',
            last_name: '',
            message: '',
            selectedFile: null,
            updates: [],
            current_pass: '',
            new_pass: '',
            confirm_pass: '',
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
        update_details(data, url) {
            this.updates = []
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
        async getUserData() {
            let token = localStorage.getItem("jwt")
            let decode = await jwt.verify(token, 'secret')
            let options = {
                method: 'get',
                headers: {'Authorization': localStorage.getItem("jwt")},
                url: 'http://localhost:5000/api/users/me/'+decode.body.name
            }
            let user = await axios(options).catch(e => {console.log(e)})
            this.username = user.data.username
            this.email = user.data.email
            this.last_name = user.data.last_name
            this.first_name = user.data.first_name
        }
    },
    created() {
        this.getUserData()
    }
}
</script>