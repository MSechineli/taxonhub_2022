import 'package:flutter/material.dart';
import 'package:front_end/colors/colors.dart';

class ButtonSearch extends StatelessWidget {
  const ButtonSearch({
    Key? key,
    required this.title,
    required this.onPressed,
  }) : super(key: key);

  final String title;
  final void Function()? onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 80,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          backgroundColor: ColorsApp.greenButtonSearch,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25),
          ),
          side: const BorderSide(
            color: ColorsApp.borderButtonSearch,
            width: 2,
          ),
        ),
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 10),
          child: Text(
            title,
            style: const TextStyle(
              color: ColorsApp.textButtonModal,
              fontSize: 30,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }
}
