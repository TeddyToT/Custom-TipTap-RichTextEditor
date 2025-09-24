  import React, { useState } from 'react';
  import { Zap, Play, Trash } from 'lucide-react';

  interface AnimationDialogProps {
    onConfirm: (animationConfig: {
      type: string;
      duration?: string;
      delay?: string;
      repeat?: 'once' | 'infinite';
      ease?: string;
      hoverPause?: boolean;
    }) => void;
    onRemove: () => void;
    onCancel: () => void;
    currentAnimation?: {
      type?: string;
      duration?: string;
      delay?: string;
      repeat?: 'once' | 'infinite';
      ease?: string;
      hoverPause?: boolean;
    } | null;
  }

  const AnimationDialog: React.FC<AnimationDialogProps> = ({ 
    onConfirm,
    onRemove,
    onCancel,
    currentAnimation
  }) => {
    const [config, setConfig] = useState({
      type: currentAnimation?.type || 'bounce',
      duration: currentAnimation?.duration || '1000ms',
      delay: currentAnimation?.delay || '0ms',
      repeat: currentAnimation?.repeat || 'once' as 'once' | 'infinite',
      ease: currentAnimation?.ease || 'ease-in',
      hoverPause: currentAnimation?.hoverPause || false
    });

    const [previewActive, setPreviewActive] = useState(false);

    const animationTypes = [
      { 
        value: 'bounce',
        label: 'Bounce',
        description: 'Hiệu ứng nhảy lên xuống',
        className: 'animate-bounce'
      },
      { 
        value: 'jump-in',
        label: 'Jump In',
        description: 'Nhảy vào từ dưới lên',
        className: 'animate-jump-in'
      },
      {
        value: 'fade',
        label: 'Fade In',
        description: 'Hiện dần từ trong suốt',
        className: 'animate-fade'
      },
      {
        value: 'fade-left',
        label: 'Fade Left',
        description: 'Trượt từ phải sang trái',
        className: 'animate-fade-left'
      },
      { 
        value: 'fade-right',
        label: 'Fade Right',
        description: 'Trượt từ trái sang phải',
        className: 'animate-fade-right'
      },
      { 
        value: 'fade-up',
        label: 'Fade Up',
        description: 'Trượt từ dưới lên trên',
        className: 'animate-fade-up'
      },
      {
        value: 'fade-down',
        label: 'Fade Down',
        description: 'Trượt từ trên xuống dưới',
        className: 'animate-fade-down'
      },
      {
        value: 'pulse',
        label: 'Pulse',
        description: 'Nhấp nháy opacity',
        className: 'animate-pulse'
      },
      {
        value: 'ping',
        label: 'Ping',
        description: 'Hiệu ứng sóng lan tỏa',
        className: 'animate-ping'
      },
      {
        value: 'spin',
        label: 'Spin',
        description: 'Xoay 360 độ',
        className: 'animate-spin'
      }
    ];

    const easeOptions = [
      { value: 'ease-linear', label: 'Linear' },
      { value: 'ease-in', label: 'Ease In' },
      { value: 'ease-out', label: 'Ease Out' },
      { value: 'ease-in-out', label: 'Ease In Out' }
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateConfig = (key: string, value: any) => {
      setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
      if (!config.type) return;
      onConfirm(config);
    };

    const triggerPreview = () => {
      setPreviewActive(true);
      setTimeout(() => setPreviewActive(false), 2000);
    };

    const getPreviewClasses = () => {
      const selectedAnimation = animationTypes.find(a => a.value === config.type);
      if (!selectedAnimation || !previewActive) return '';

      const classes = [selectedAnimation.className];

      // Add repeat class
      if (config.repeat === 'once') {
        classes.push('animate-once');
      } else {
        classes.push('animate-infinite');
      }

      // Add duration class
      if (config.duration === '1000ms') {
        classes.push('animate-duration-1000');
      } else if (config.duration === '1500ms') {
        classes.push('animate-duration-[1500ms]');
      } else if (config.duration === '2000ms') {
        classes.push('animate-duration-[2000ms]');
      } else if (config.duration === '500ms') {
        classes.push('animate-duration-500');
      }

      // Add delay class
      if (config.delay === '100ms') {
        classes.push('animate-delay-100');
      } else if (config.delay === '200ms') {
        classes.push('animate-delay-200');
      } else if (config.delay === '300ms') {
        classes.push('animate-delay-300');
      }

      // Add ease class
      classes.push(config.ease);
      
      return classes.join(' ');
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
          <div className="flex items-center mb-4">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            <h3 className="text-lg font-semibold">Thiết lập Animation</h3>
          </div>

          <div className="space-y-6">
            {/* Animation Type Grid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Chọn loại animation</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {animationTypes.map((animation) => (
                  <div
                    key={animation.value}
                    className={`
                      p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md
                      ${config.type === animation.value 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                      }
                    `}
                    onClick={() => updateConfig('type', animation.value)}
                  >
                    <div className="font-medium text-sm">{animation.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{animation.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration & Delay */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thời lượng</label>
                <select
                  value={config.duration}
                  onChange={(e) => updateConfig('duration', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="500ms">0.5 giây</option>
                  <option value="1000ms">1 giây</option>
                  <option value="1500ms">1.5 giây</option>
                  <option value="2000ms">2 giây</option>
                  <option value="3000ms">3 giây</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Độ trễ</label>
                <select
                  value={config.delay}
                  onChange={(e) => updateConfig('delay', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="0ms">Không trễ</option>
                  <option value="100ms">0.1 giây</option>
                  <option value="200ms">0.2 giây</option>
                  <option value="300ms">0.3 giây</option>
                  <option value="500ms">0.5 giây</option>
                </select>
              </div>
            </div>

            {/* Repeat & Ease */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lặp lại</label>
                <select
                  value={config.repeat}
                  onChange={(e) => updateConfig('repeat', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="once">Một lần</option>
                  <option value="infinite">Vô hạn</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Easing</label>
                <select
                  value={config.ease}
                  onChange={(e) => updateConfig('ease', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  {easeOptions.map(ease => (
                    <option key={ease.value} value={ease.value}>{ease.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hover Pause Option */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hoverPause"
                checked={config.hoverPause}
                onChange={(e) => updateConfig('hoverPause', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="hoverPause" className="text-sm text-gray-700">
                Tạm dừng animation khi hover
              </label>
            </div>

            {/* Preview Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Preview</label>
                <button
                  type="button"
                  onClick={triggerPreview}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                >
                  <Play className="w-3 h-3" />
                  Xem thử
                </button>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg text-center">
                <div
                  className={`
                    inline-block px-4 py-2 bg-purple-500 text-white rounded-lg font-medium
                    ${config.hoverPause ? 'hover:animate-none' : ''}
                    ${getPreviewClasses()}
                  `}
                >
                  Text mẫu
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                <Trash className="w-4 h-4" />
                Xóa Animation
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default AnimationDialog;