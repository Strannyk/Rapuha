<template>
    <div>
        <breadcrumbs :list="breadcrumbs"></breadcrumbs>
        <quote-form ref="quoteForm"
                    :newQuote="false"
                    @submit="save"
                    @delete="openConfirmModal"
                    @cancel="goToQuotesList">
        </quote-form>
        <item-action-result-modal ref="resultModal"
                                  :successResult="actionSuccess"
                                  :titleWording="actionResultModalTitleWording"
                                  :message="actionMessage"
                                  @close="onCloseResultModal">
        </item-action-result-modal>
        <item-deleting-confirm-modal ref="confirmModal"
                                     :titleWording="'Удаление цитаты'"
                                     :bodyWording="'Удалить цитату?'"
                                     @confirm="deleteQuote">
        </item-deleting-confirm-modal>
    </div>
</template>

<script src="./edit-quote-page.js"></script>
