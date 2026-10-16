document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", function () {
            const isCurrentlyOpen =
                question.getAttribute("aria-expanded") === "true";

            // Tutup semua pertanyaan terlebih dahulu
            faqItems.forEach(function (otherItem) {
                const otherQuestion =
                    otherItem.querySelector(".faq-question");
                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                otherQuestion.setAttribute("aria-expanded", "false");
                otherAnswer.hidden = true;
                otherItem.classList.remove("is-open");
            });

            // Jika sebelumnya tertutup, buka pertanyaan yang diklik
            if (!isCurrentlyOpen) {
                question.setAttribute("aria-expanded", "true");
                answer.hidden = false;
                item.classList.add("is-open");
            }
        });
    });

    console.log("FAQ SkillUp Academy berhasil dimuat.");
});