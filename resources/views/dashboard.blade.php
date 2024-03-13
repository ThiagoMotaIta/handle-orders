<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Orders <span id="message-span"></span>
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <button id="read-from-json-btn" type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-primary text-white" onclick="readJsonFile()">
                Load From JSON
            </button><span id="table-title"></span>
            <br/><br/>
            <hr/>
            <br/>
            <div align="right">
                <input id="search-form" type="text" class="form-group" placeholder="Search by Customer">
                <button class="btn btn-primary" onclick="getAllBySearch()"><i class="fa fa-search"></i></button>
            </div>
            <br/>
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    Here, we can list all orders from the json file:
                </div>

                <div class="navbar p-2">
                    <table class="table table-striped table-responsive" id="table-list">
                        <thead class="alert-primary">
                            <tr>
                                <tr id="table-trs"></tr>
                            </tr>
                        </thead>
                        <tbody id="table-results">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
