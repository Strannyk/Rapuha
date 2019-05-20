<template>
    <div>
        <quote-form ref="quoteForm"
                    :newQuote="false"
                    @submit="save">
        </quote-form>
        <item-action-result-modal ref="modal"
                                  :postType="'quote'"
                                  :actionType="'edition'"
                                  :successResult="editQuoteSuccess"
                                  :message="editQuoteMessage"
                                  @close="onCloseModal">
        </item-action-result-modal>
    </div>
</template>

<script src="./edit-quote-page.js"></script>
