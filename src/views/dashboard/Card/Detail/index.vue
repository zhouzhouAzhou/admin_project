<template>
    <div>
        <div class="card-head">
            <span>{{title}}</span>
            <svg t="1683796452931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380" data-spm-anchor-id="a313x.7781069.0.i1" width="16" height="16"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" fill="#000000" p-id="2381"></path></svg>
        </div>
        <div class="card-content">
            {{ count }}
        </div>
        <div class="card-charts">
            <slot name="charts"></slot>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    props: ['title','count']
}
</script>

<style scoped>
    .card-head {
        display: flex;
        justify-content: space-between;
        color: #d9d9d9;
        /* font-size: ; */
    }
    .card-content {
        font-size: 30px;
        padding: 10px 0
    }
    .card-charts {
        height: 45px;
        font-size: 12px;

    }
    .card-footer {
        border-top: 1px solid #eee;
        padding-top: 5px;
        font-size: 14px;

    }
</style>