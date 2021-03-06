const { createFactory } = require('ipfsd-ctl')
const tests = require('interface-ipfs-core')
const isDev = process.env.IPFS_RUST_EXEC

const isNode = (process && process.env)

const ipfsBin = isNode ?
  process.env.IPFS_RUST_EXEC ? process.env.IPFS_RUST_EXEC : require('rust-ipfs-dep').path()
    : undefined

const options = {
  type: 'rust',
  ipfsBin,
  test: true,
  disposable: true,
  ipfsHttpModule: require('ipfs-http-client'),
  ipfsOptions: {
    init: {
      bits: 2048
    }
  }
}

const factory = createFactory(options)

// Phase 1.0-ish
//
tests.miscellaneous(factory, { skip: [
  'dns',
  'resolve',
  // these cause a hang 20% of time:
  'should respect timeout option when getting the node id',
  'should respect timeout option when getting the node version'
] })

// Phase 1.1

// these are a bit flaky
tests.pubsub(factory)
// these are rarely flaky
tests.swarm(factory)

// Phase 1.2

// this is ignored because the js ipfs-http-client doesn't expose the
// localResolve parameter, and the later versions no longer send Content-Length
// header, which our implementation requires.
tests.dag.get(factory, { skip: ['should get only a CID, due to resolving locally only'] })
tests.dag.put(factory)

tests.block(factory, {
  skip: [
    // both are pinning related
    'should error when removing pinned blocks',
    'should put a buffer, using options'
  ]
})

// these are a bit flaky
tests.bitswap(factory, {
  skip: [
    // these are broken, block/get is never dropped
    'should remove blocks from the wantlist when requests are cancelled',
    'should keep blocks in the wantlist when only one request is cancelled'
  ]
})
tests.root.refs(factory);
tests.root.refsLocal(factory);

// Phase 2 and beyond...

tests.root.cat(factory);
tests.root.get(factory);
// tests.repo(factory)
// tests.object(factory)
// tests.pin(factory)
// tests.bootstrap(factory)
// tests.dht(factory)
// tests.name(factory)
// tests.namePubsub(factory)
// tests.ping(factory)
// tests.key(factory)
// tests.config(factory)
// tests.stats(factory)
// tests.files(factory)
