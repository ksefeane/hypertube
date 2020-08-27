<template>
    <div>
        <h1>{{ message }}</h1>
        <canvas id="profile_pic"></canvas>
        <input type="file" name="" id="" @change="onFileSelected"> <br>
        <button @click="uploadImage">Upload</button>
        <div>
            <p>Username: {{username}}</p>
            <p>First Name: {{first_name}}</p>
            <p>Last Name: {{last_name}}</p>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
    data() {
        return {
            username: 'pulp_fict',
            first_name: 'Marcellus',
            last_name: 'Wallace',
            message: 'this is the profile page',
            selectedFile: null
        }
    },
    methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0]
            console.log(event)
        },
        uploadImage() {
            console.log(this.selectedFile);
            let type = this.selectedFile.type
            // const url = ''
            console.log('name: ' + this.selectedFile.name);
            console.log('size: ' + this.selectedFile.size);
            console.log('type: ' + this.selectedFile.type);
            var nn = type.split('/')
            if (nn[0] === 'image') {
                console.log("We've got an IMAGE!");
            } else if (nn[0] === 'video') {
                console.log("We've got a VIDEO!");
            }
            // console.log(formData);
            // axios.post(url, {
            //     'image': this.selectedFile
            // })
        }
    }
}
</script>