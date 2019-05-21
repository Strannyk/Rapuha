<template>
    <div>
        <quote-form ref="quoteForm"
                    :newQuote="false"
                    @submit="save"
                    @delete="openConfirmModal"
                    @cancel="goToQuotesList">
        </quote-form>
        <item-action-result-modal ref="resultModal"
                                  :postType="'quote'"
                                  :actionType="'edition'"
                                  :successResult="editQuoteSuccess"
                                  :message="editQuoteMessage"
                                  @close="onCloseResultModal">
        </item-action-result-modal>
        <item-deleting-confirm-modal ref="confirmModal"
                                     :postType="'quote'"
                                     @confirm="deleteQuote">
        </item-deleting-confirm-modal>
    </div>
</template>

<script src="./edit-quote-page.js"></script>
