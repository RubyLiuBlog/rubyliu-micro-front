import babel from 'rollup-plugin-babel'
export default {
  // 核心选项
  input: './src/index.js',     // 必须
  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file: './build/bundle.js',    // 必须
    format:  'cjs',   // 必须
    sourcemap: true,
  },
  plugins: [babel({
    exclude: 'node_modules/**' // 只编译我们的源代码
  })],
};