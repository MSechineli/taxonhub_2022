part of 'searchs_bloc.dart';

@freezed
class SearchsEvent with _$SearchsEvent {
  const factory SearchsEvent.init(SearchType searchType) = _Init;
  const factory SearchsEvent.import() = _Import;
  const factory SearchsEvent.search(PlatformFile file) = _Search;
  const factory SearchsEvent.export({
    required List<Taxonomic>? taxonomicsList,
    required List<Occurrence>? occurrenciesList,
    required String fileName,
  }) = _Export;
  const factory SearchsEvent.alert() = _Alert;
  const factory SearchsEvent.reset() = _Reset;
}
