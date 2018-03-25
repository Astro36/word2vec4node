{
  "targets": [
    {
      "target_name": "word2vec",
      "conditions": [
        ['OS!="win"', {"sources": ["lib/word2vec.cc"]}],
      ]
    }
  ]
}