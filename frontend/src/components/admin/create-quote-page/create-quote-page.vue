<template>
    <div>
        <quote-form ref="quoteForm"
                    :newQuote="true"
                    @submit="save">
        </quote-form>
        <item-creation-result-modal ref="modal"
                                    :postType="'quote'"
                                    :successResult="createQuoteSuccess"
                                    :message="createQuoteMessage"
                                    @close="onCloseModal">
        </item-creation-result-modal>
    </div>
</template>

<script src="./create-quote-page.js"></script>
