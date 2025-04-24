# What is `VBA Module Generator`?

Try it online: [vba-module-generator](https://litygames.github.io/vba-module-generator)

`VBA Module Generator` is an online tool that takes your `VBA code` and generates a macro to automatically insert it into a new module.

The tool splits your VBA code into blocks of up to `24 lines` to fit within `VBA's internal limit`.

By default, a subroutine called `InsertModule` will be created, and the code will be split into subroutines or functions (making it easier to debug). 

However, you can disable this behavior in the tool’s `options` if you prefer.

> [!Important]
> This online tool **DOES NOT** verify whether your VBA code is correct.

If you found this tool helpful, you can support my work on  

[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/litygames)

## Usage

1. Paste your `VBA code` into the `Enter code for the new module:` field. 
    
2. Click the `Generate Macro` button.  
   
3. Click the `Copy Code` button and paste the generated code into a module in your `VBA project`.
   
4. Run it to make sure your code was successfully created in the `GeneratedModule`.

### Options Section

- **✅ `Insert Lines Only`**: Generates the code without the subroutine, only the `InsertLines` statement:

```vba
    lineNumber = .CountOfLines + 1
    .InsertLines lineNumber
```
- **✅ `Ignore Subroutine or Function Blocks`**: Does not split your code by each subroutine or function; it only generates the code respecting the 24-line limit.
   
## Contributing

Feel free to open issues or submit pull requests to help improve the online tool.

## Support

If you have any questions or need help, please feel free to open an issue in the GitHub repository, or reach out via email at litygames@hotmail.com

## License

This project is licensed under the GNU General Public License v3.0.

You’re free to use, modify, and share it — just remember to share any changes and give credit to this repository.

See the [LICENSE](LICENSE) file or visit [gnu.org](https://www.gnu.org/licenses/gpl-3.0.txt) for more information.
