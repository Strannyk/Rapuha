<template>
    <div v-if="active">
        <div class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{titleWording}}</h5>
                        <button v-on:click="close"
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p :class="successResult ? 'text-success' : 'text-danger'">{{message}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                v-on:click="close"
                                class="btn btn-secondary"
                                data-dismiss="modal">OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="r-overlay"></div>
    </div>
</template>

<script src="./item-action-result-modal.js"></script>
