var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var app = new Vue({
        el: '#app',
        data: {
            access_token: "IGQVJWTGh3M3p3cmVUOWdMUE1NNi1xY00zTHNRX1FaU2EzZA2lodGZAzeVk4RnFFQS1xMjlRcnY0aHVBMDNuTGNuLWR4b1NfQnlGQ2hINVNBSEdqclIzMXI5T21zS0hySnY4ZA1o2cld3YWhyWFI0Q0JMTwZDZD",
            url: "https://graph.instagram.com/me/media/",
            username: "",
            grams: [],
            next_url: "",
            error: false,
            loading: false
        },
        computed: {
            instapage() {
                return 'https://www.instagram.com/' + this.username
            }
        },
        methods: {
            getGrams() {
                this.loading= true;
                axios.get(this.url + "?fields=id,caption,permalink,username,media_url&access_token=" + this.access_token)
                    .then(({data}) => {
                        if (isMobile) {
                            this.grams = data.data.slice(0,3)
                        }
                        else {
                            this.grams = data.data.slice(0,6)
                        }
                        this.username = data.data[0].username
                        this.next_url = data.paging.next
                        this.loading = false;
                    })
                    .catch(function (error) {
                        this.loading = false;
                    });
            },
            getMoreGrams(){
                axios.get(this.next_url)
                    .then(({data}) => {
                        this.grams = this.grams.concat(data.data)
                        this.next_url = data.pagination.next_url
                    })
                    .catch(function (error) {
                        console.log(error)
                        this.error = false
                    });
            }
        },
        created() {
            this.getGrams();
        }
    })
