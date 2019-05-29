<template>
    <div>
        <breadcrumbs :list="breadcrumbs"></breadcrumbs>
        <quote-form ref="quoteForm"
                    :newQuote="true"
                    @submit="save"
                    @cancel="goToQuotesList">
        </quote-form>
        <item-action-result-modal ref="modal"
                                  :successResult="createQuoteSuccess"
                                  :titleWording="'Создание цитаты'"
                                  :message="createQuoteMessage"
                                  @close="onCloseModal">
        </item-action-result-modal>
    </div>
</template>

<script src="./create-quote-page.js"></script>
