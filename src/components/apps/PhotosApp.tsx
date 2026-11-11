import { useState, useEffect } from 'react';
import {
  Image,
  Heart,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FolderHeart,
  Compass,
  Search,
  ArrowLeft,
  Info,
} from 'lucide-react';
import { PHOTOS, PHOTO_ALBUMS } from '../../data/portfolioData';
import { PhotoItem } from '../../types';

export const PhotosApp = ({ compact = false }: { compact?: boolean }) => {
  const [activeAlbum, setActiveAlbum] = useState<string>('All Photos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [photosList, setPhotosList] = useState<PhotoItem[]>(PHOTOS);
  const [showInfo, setShowInfo] = useState(true);
  const [showAlbumMenu, setShowAlbumMenu] = useState(false);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotosList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, favorite: !p.favorite };
          if (selectedPhoto?.id === id) {
            setSelectedPhoto(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const filteredPhotos = photosList.filter((photo) => {
    let matchesAlbum = true;
    if (activeAlbum === 'Favorites') {
      matchesAlbum = !!photo.favorite;
    } else if (activeAlbum !== 'All Photos') {
      matchesAlbum = !!photo.album && photo.album === activeAlbum;
    }

    const albumText = photo.album ?? '';
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      albumText.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesAlbum && matchesSearch;
  });

  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (filteredPhotos.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIdx]);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (filteredPhotos.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIdx]);
  };

  // Keyboard navigation inside the window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') setSelectedPhoto(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentIndex, filteredPhotos]);

  return (
    <div className="relative flex flex-col h-full w-full bg-zinc-900 text-zinc-100 overflow-hidden select-text">
      {/* ============================================================== */}
      {/* VIEW A: SINGLE PHOTO INSPECTION VIEW (Inside Window)           */}
      {/* ============================================================== */}
      {selectedPhoto ? (
        <div className="flex-1 flex flex-col h-full w-full bg-zinc-950 overflow-hidden">
          {/* Detail Toolbar */}
          <div className="h-10 shrink-0 bg-zinc-900/90 border-b border-white/10 px-3 flex items-center justify-between select-none">
            {/* Back Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
              <span>{activeAlbum}</span>
            </button>

            {/* Photo Title & Counter */}
            <div className="flex items-center space-x-2 text-xs truncate max-w-[50%]">
              <span className="font-semibold text-white truncate">{selectedPhoto.title}</span>
              {filteredPhotos.length > 1 && (
                <span className="text-[11px] text-zinc-500 font-mono">
                  ({currentIndex + 1} of {filteredPhotos.length})
                </span>
              )}
            </div>

            {/* Action Tools: Favorite & Info Toggle */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={(e) => toggleFavorite(selectedPhoto.id, e)}
                className={`p-1.5 rounded-lg transition-colors ${
                  selectedPhoto.favorite
                    ? 'bg-pink-600/30 text-pink-400'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                }`}
                title="Favorite"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
              </button>

              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showInfo
                    ? 'bg-blue-600/30 text-blue-400'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                }`}
                title="Toggle Caption Details"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Photo Center Stage */}
          <div className="relative flex-1 min-h-0 w-full bg-black/60 flex items-center justify-center p-3 overflow-hidden">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all"
            />

            {/* Previous Photo Button */}
            {filteredPhotos.length > 1 && (
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next Photo Button */}
            {filteredPhotos.length > 1 && (
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Details Bar (Collapsible via Info button) */}
          {showInfo && (
            <div className="shrink-0 bg-zinc-900/95 border-t border-white/10 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-xs animate-in slide-in-from-bottom-2 duration-150">
              <p className="text-zinc-200 text-xs leading-relaxed max-w-xl">
                {selectedPhoto.caption}
              </p>
              <div className="flex items-center space-x-3 text-zinc-400 text-[11px] shrink-0">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>{selectedPhoto.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-blue-400" />
                  <span>{selectedPhoto.date}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ============================================================== */
        /* VIEW B: ALBUMS & PHOTO GALLERY GRID                            */
        /* ============================================================== */
        <div className={`flex-1 flex h-full w-full overflow-hidden ${compact ? 'flex-col' : 'flex-col'}`}>
          {/* Photos Toolbar */}
          {!compact && (
            <div className="shrink-0 bg-zinc-950/70 border-b border-white/10 px-4 flex items-center justify-between select-none h-10">
              <div className="flex items-center space-x-2 text-xs text-zinc-300">
                <Image className="w-4 h-4 text-pink-400" />
                <span className="font-semibold text-white">{activeAlbum}</span>
                <span className="text-[11px] text-zinc-500">({filteredPhotos.length} photos)</span>
              </div>

              <div className="relative w-44 sm:w-56">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search photos, places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 pr-3 py-1 bg-white/5 hover:bg-white/10 focus:bg-white/10 text-xs rounded-lg border border-white/10 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          )}

          {compact && (
            <div className="shrink-0 bg-zinc-950/70 border-b border-white/10 px-3 py-2 text-xs text-zinc-300 select-none">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-pink-400" />
                <span className="font-semibold text-white">{activeAlbum}</span>
                <span className="text-[11px] text-zinc-500">({filteredPhotos.length} photos)</span>
              </div>
            </div>
          )}

          {/* Main Body */}
          <div className={`flex-1 flex overflow-hidden ${compact ? 'flex-col' : ''}`}>
            {/* Left Sidebar */}
            <div className={`${compact ? 'w-full border-b border-white/10' : 'w-48 border-r'} shrink-0 bg-zinc-950/50 border-white/10 p-2.5 flex flex-col justify-between select-none`}>
              {compact ? (
                <div className="space-y-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <button
                      onClick={() => setActiveAlbum('All Photos')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-medium ${
                        activeAlbum === 'All Photos' ? 'bg-blue-600/30 text-blue-300' : 'text-zinc-200'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-blue-400" />
                        All Photos
                      </span>
                      <span className="text-zinc-400">{activeAlbum === 'All Photos' ? '•' : ''}</span>
                    </button>

                    <button
                      onClick={() => setActiveAlbum('Favorites')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-medium ${
                        activeAlbum === 'Favorites' ? 'bg-pink-600/20 text-pink-300' : 'text-zinc-200'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FolderHeart className="w-3.5 h-3.5 text-pink-400" />
                        Favorites
                      </span>
                      <span className="text-zinc-400">{activeAlbum === 'Favorites' ? '•' : ''}</span>
                    </button>

                    <button
                      onClick={() => setShowAlbumMenu((prev) => !prev)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-400 border-t border-white/10 bg-zinc-950/20"
                    >
                      <span className="flex items-center gap-2 text-zinc-300">
                        <Image className="w-3.5 h-3.5 text-zinc-400" />
                        Albums
                      </span>
                      <span>{showAlbumMenu ? '−' : '+'}</span>
                    </button>

                    {showAlbumMenu && (
                      <div className="space-y-0.5 border-t border-white/10 bg-zinc-950/30 p-1.5">
                        {PHOTO_ALBUMS.filter((a) => a !== 'All Photos').map((album) => (
                          <button
                            key={album}
                            onClick={() => {
                              setActiveAlbum(album);
                              setShowAlbumMenu(true);
                            }}
                            className={`w-full flex items-center space-x-2 px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                              activeAlbum === album
                                ? 'bg-blue-600/30 text-blue-300 font-semibold'
                                : 'text-zinc-200 hover:bg-white/5'
                            }`}
                          >
                            <Image className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="truncate">{album}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-1">
                      Library
                    </div>
                    <div className="space-y-0.5">
                      <button
                        onClick={() => setActiveAlbum('All Photos')}
                        className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                          activeAlbum === 'All Photos'
                            ? 'bg-blue-600/30 text-blue-300 font-semibold'
                            : 'text-zinc-300 hover:bg-white/5'
                        }`}
                      >
                        <Compass className="w-3.5 h-3.5 text-blue-400" />
                        <span>All Photos</span>
                      </button>

                      <button
                        onClick={() => setActiveAlbum('Favorites')}
                        className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                          activeAlbum === 'Favorites'
                            ? 'bg-blue-600/30 text-blue-300 font-semibold'
                            : 'text-zinc-300 hover:bg-white/5'
                        }`}
                      >
                        <FolderHeart className="w-3.5 h-3.5 text-pink-400" />
                        <span>Favorites</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-1">
                      Albums
                    </div>
                    <div className="space-y-0.5">
                      {PHOTO_ALBUMS.filter((a) => a !== 'All Photos').map((album) => (
                        <button
                          key={album}
                          onClick={() => setActiveAlbum(album)}
                          className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                            activeAlbum === album
                              ? 'bg-blue-600/30 text-blue-300 font-semibold'
                              : 'text-zinc-300 hover:bg-white/5'
                          }`}
                        >
                          <Image className="w-3.5 h-3.5 text-zinc-400" />
                          <span className="truncate">{album}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!compact && (
                <div className="text-[10px] text-zinc-500 text-center py-1">
                  Personal Life & Memories
                </div>
              )}
            </div>

            {/* Photos Grid */}
            <div className={`flex-1 overflow-y-auto bg-zinc-900/30 ${compact ? 'p-3' : 'p-4 md:p-6'}`}>
              {filteredPhotos.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                  <Image className="w-12 h-12 text-zinc-600 mb-2" />
                  <p className="text-sm font-medium text-zinc-300">No photos in this album</p>
                  <p className="text-xs text-zinc-500 mt-1">Try selecting another album or clearing search</p>
                </div>
              ) : (
                <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                  {filteredPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative rounded-xl overflow-hidden bg-black/40 border border-white/10 hover:border-pink-500/50 cursor-pointer shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                      {/* Photo Image */}
                      <div className="aspect-4/3 w-full overflow-hidden bg-zinc-800">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Gradient Info Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                        {/* Favorite Heart Button */}
                        <div className="flex justify-end">
                          <button
                            onClick={(e) => toggleFavorite(photo.id, e)}
                            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                              photo.favorite
                                ? 'bg-pink-600 text-white'
                                : 'bg-black/40 text-white/70 hover:text-white'
                            }`}
                            title="Favorite"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>

                        {/* Photo Details */}
                        <div>
                          <h4 className="text-sm font-bold text-white drop-shadow-sm truncate">
                            {photo.title}
                          </h4>
                          <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">
                            {photo.caption}
                          </p>
                          <div className="flex items-center space-x-2 text-[10px] text-zinc-400 mt-1.5">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-2.5 h-2.5 text-red-400" />
                              <span className="truncate">{photo.location}</span>
                            </span>
                            <span>•</span>
                            <span>{photo.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
