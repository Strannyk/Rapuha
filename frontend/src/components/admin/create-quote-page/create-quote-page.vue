<template>
    <div>
        <quote-form ref="quoteForm"
                    :newQuote="true"
                    @submit="save">
        </quote-form>
        <item-action-result-modal ref="modal"
                                  :postType="'quote'"
                                  :actionType="'creation'"
                                  :successResult="createQuoteSuccess"
                                  :message="createQuoteMessage"
                                  @close="onCloseModal">
        </item-action-result-modal>
    </div>
</template>

<script src="./create-quote-page.js"></script>
