<template>
    <div>
        <button @click="changeColor('green')">Green</button>
        <button @click="changeColor('red')">Red</button>
        
        <p>You've selected a <b>{{ queryParameters.color }}</b> car.</p>
    </div>
</template>

<script>
import url from 'url-parameters';

export default {
    mounted(){
        // Start listening for changes in the query string.
        url.enable(onChange => {
            this.queryParameters = onChange.queryParams;
            this.queryString = onChange.queryString;

            // Refetch the data every time any changes are made to the query string.
            this.getCars();
        }, false);
    },

    data(){
        return {
            queryParameters: {color: 'blue'},
            queryString: ''
        }
    },

    methods: {
        getCars(){
            // Fetch data with the current query string filters applied.
            window.axios.get('https://example.org/api/cars?' + this.queryString).then(response => {
                
            });
        },

        changeColor(value){
            // When this is changed the url listener will be triggered 
            // and the getCars() method will be rerun.
            url.set('color', value);
        }
    }
}
</script>