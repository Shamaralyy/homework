module.exports = function replace(source) {
    const targetStr = this.query.targetStr;
    const resultStr = this.query.resultStr;
    return source.replaceAll(targetStr,resultStr);
}