async function fetchExchangeRate(conversionType) {
    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/last/USD-BRL`);
        const data = await response.json();
        return parseFloat(data["USDBRL"].bid);
    } catch (error) {
        alert("Erro ao obter a cotação. Tente novamente mais tarde.");
        console.error("Erro ao buscar a cotação:", error);
    }
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const conversionType = document.getElementById("conversion-type").value;
    const resultContainer = document.getElementById("result-container");
    const resultElement = document.getElementById("result");

    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, insira um valor válido para conversão.");
        return;
    }

    const exchangeRate = await fetchExchangeRate(conversionType);
    if (!exchangeRate) return;

    let result;
    if (conversionType === "USD-BRL") {
        // Dólar para Real: Multiplicação
        result = (amount * exchangeRate).toFixed(2);
        resultElement.innerText = `${result} BRL`;
    } else if (conversionType === "BRL-USD") {
        // Real para Dólar: Divisão
        result = (amount / exchangeRate).toFixed(2);
        resultElement.innerText = `${result} USD`;
    }

    resultContainer.style.display = "block";
}